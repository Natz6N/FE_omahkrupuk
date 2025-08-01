export const CardOne = ({url, id, image, name, sisaBarang, sold }) => {
  return (
    <a href={url} key={id} className="flex items-center gap-2">
      <div className="flex bg-red-400 items-center justify-center h-24 w-24 rounded rounded-md">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="block w-full flex-1">
        <h4 className="font-semibold text-2xl truncate">{name}</h4>
        <p>{sisaBarang}</p>
      </div>
      <h2 className="flex items-center flex-1 justify-center">{sold}</h2>
    </a>
  );
};
