import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./ProjectCard.scss";

export const ProjectCard = (props: any) => {
  const { item, onClickEdit } = props;

  return (
    <Card
      cover={
        item?.imageUrl ? (
          <img alt="project-cover-image" src={item.imageUrl} />
        ) : (
          <img
            style={{ opacity: 0.7 }}
            alt="project-cover-image"
            src="http://res.cloudinary.com/dvw1phdxp/image/upload/v1723963247/avatars/1723963245266.jpg"
          />
        )
      }
      bordered={false}
      className="ProjectCard"
    >
      <div className="ProjectCard-title">
        <h3>{item?.name}</h3>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickEdit(item);
          }}
          className="icon-button"
        />
      </div>
      <p className="ProjectCard-description">{item.description}</p>
    </Card>
  );
};
