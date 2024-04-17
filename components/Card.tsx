import { TheCatApiV1ImagesSearchItem } from '@/types/api/thecatapi';
// import Image from "next/image";

type Props = {
  data: TheCatApiV1ImagesSearchItem;
}

const Card = (props: Props) => {
  const { data } = props;

  {/** @description aspect-square nuemus tada visi pasistrechintu pagal adsa ar ilgiausia paveiksliuka, bet nzn ar to reikia */}
  return (
    <div className="aspect-square bg-white">
      <img
        className="w-full h-full object-cover object-center"
        src={data.url}
        alt={data.id}
      />
      {/** @description next/image nepanaudojau, nes pastebejau kad skirtingu hostname gali pasitaikyt, tai potencialu gaut errora */}
      {/* <Image */}
      {/*   className="w-full h-full object-cover object-center" */}
      {/*   src={data.url} */}
      {/*   alt={data.id} */}
      {/*   width={data.width} */}
      {/*   height={data.height} */}
      {/*   priority */}
      {/* /> */}
    </div>
  )
};

export default Card;
