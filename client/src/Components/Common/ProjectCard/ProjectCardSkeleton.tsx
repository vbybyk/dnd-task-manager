import { Skeleton, Card } from "antd";

export const ProjectCardSkeleton = () => {
  return (
    <div className="ProjectCardSkeleton" data-testid="skeleton-card">
      <Card
        cover={<Skeleton.Button active style={{ minWidth: "100%", height: "130px" }} />}
        bordered={false}
        className="ProjectCard"
      >
        <Skeleton active />
      </Card>
    </div>
  );
};
