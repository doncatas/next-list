import { TheCatApiV1ImagesSearchItem } from '@/app/types/api/thecatapi';
import Image from "next/image";

type Props = {
  data: TheCatApiV1ImagesSearchItem;
}

const Card = (props: Props) => {
  const { data } = props;

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
