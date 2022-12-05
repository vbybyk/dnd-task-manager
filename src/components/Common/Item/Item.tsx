import "./item.scss";

export const Item = ({
  id,
  name,
  dragOverlay,
}: {
  id: number | null;
  name?: string | undefined;
  dragOverlay?: any | undefined;
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };
  return (
    <div style={style} className="item">
      Task #{id}
      <h3>{name}</h3>
    </div>
  );
};
