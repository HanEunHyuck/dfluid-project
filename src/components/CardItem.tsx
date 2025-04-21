export type Card = {
  title: string;
  year: number;
  thumb: string;
  txt: string;
};

const CardItem = ({ card }: { card: Card }) => {
  return (
    <div className="rounded-[10px] bg-[#d9d9d9] p-5 font-['Montserrat']">
      <div className="flex justify-between gap-2">
        <span className="overflow-hidden font-bold tracking-[-0.24px] text-ellipsis whitespace-nowrap">
          {card.title}
        </span>
        <span className="tracking-[-0.24px]">{card.year}</span>
      </div>
      <img src={card.thumb} alt="" className="mt-2 w-full rounded-[5px]" />
      <p className="mt-5 line-clamp-6 text-sm tracking-[-0.21px]">{card.txt}</p>
    </div>
  );
};

export default CardItem;
