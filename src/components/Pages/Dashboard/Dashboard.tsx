import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Button, List, Card } from "antd";
import { ProjectService } from "../../API/ProjectService";
import useTasks from "../../Hooks/useTasks";
import { IProject } from "../../Interfaces/tasks";
import { IState } from "../../store/reducers";
import "./dashboard.scss";

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  const { projects, isFetching } = useSelector((state: IState) => state);

  const { getProjects } = useTasks();
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Content className="dashboard">
        <div className="dashboard-title-wrapper">
          <h2 className="dashboard-title">My Dashboard</h2>
          <Button type="primary">Create project</Button>
        </div>
        <div className="dashboard-projects__wrapper">
          <h3 className="dashboard-projects__title">Open Projects</h3>
          <List
            grid={{
              column: 4,
              gutter: 16,
              xs: 1,
              sm: 3,
              lg: 3,
            }}
            dataSource={projects}
            renderItem={(item: IProject) => (
              <List.Item>
                {projects && (
                  <Link to={`/projects/${item.id}`}>
                    <Card title={item?.name} bordered={false} className="dashboard-project-card">
                      <p>{item.description}</p>
                      <p>Open tasks</p>
                      <p>Closed tasks</p>
                    </Card>
                  </Link>
                )}
              </List.Item>
            )}
          />
        </div>
      </Content>
    </>
  );
};
