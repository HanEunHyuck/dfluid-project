export type Card = {
  title: string;
  year: number;
  thumb: string;
  txt: string;
};

const CardItem = ({ card }: { card: Card }) => {
  return (
    <div className="rounded-[10px] bg-[#d9d9d9] p-5">
      <div className="flex justify-between">
        <span className="font-bold tracking-[-0.24px]">{card.title}</span>
        <span className="tracking-[-0.24px]">{card.year}</span>
      </div>
      <img src={card.thumb} alt="" className="mt-2" />
      <p className="mt-5 text-sm tracking-[-0.21px]">{card.txt}</p>
    </div>
  );
};

export default CardItem;
