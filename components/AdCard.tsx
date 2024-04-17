"use client";

import React, { useCallback, useLayoutEffect } from 'react';
import Script from 'next/script';
import { AD_DELAY, AD_RETRIES } from '@/consts';

const AdCard = ({ slot, adUnitPath }: { slot: string, adUnitPath: string }) => {
  const triggerScript = useCallback((attempt = 1) => {
    if (!window.googletag || !googletag.apiReady) {
      if (attempt >= AD_RETRIES) {
        return;
      }
      setTimeout(() => {
        triggerScript(attempt + 1);
      }, AD_DELAY);
      return;
    }
    googletag.cmd.push(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`defineSlot:adUnitPath:${adUnitPath}`);
      }
      googletag
        .defineSlot(adUnitPath, ['fluid'], slot)!
        .addService(googletag.pubads());
    });

    // Enable SRA and services.
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    // Request and render all previously defined ad slots.
    googletag.display(slot);
  }, [adUnitPath, slot]);
  useLayoutEffect(() => triggerScript(5), []);

  return (
    <>
      <div className="aspect-square bg-white border-2 border-solid border-black" id={slot} />
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        onLoad={() => triggerScript()}
      />
    </>
  );
}

export default AdCard;
