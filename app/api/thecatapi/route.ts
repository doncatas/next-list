import { NextRequest, NextResponse } from 'next/server';
import { LIMIT_PER_PAGE } from '@/consts';

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get('page') ?? '0';
    if (isNaN(Number(page))) {
      throw new Error('Search param should be a number');
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        ...(process.env.API_KEY && {'x-api-key': process.env.API_KEY}),
      },
    };
    const params = new URLSearchParams({limit: LIMIT_PER_PAGE.toString(), page: page.toString()});
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?${params.toString()}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText ?? 'External api response failed');
    });
    return NextResponse.json({
      data: response,
      page: Number(page),
      hasNextPage: response.length === LIMIT_PER_PAGE,
      total: response.length,
    });
  } catch (e) {
    return NextResponse.json({ message: (e as Error)?.message }, { status: 500 });
  }
}
