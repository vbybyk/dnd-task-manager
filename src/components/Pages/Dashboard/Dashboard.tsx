import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Checkbox, Space, Alert, Button, List, Card } from "antd";
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

  console.log(projects);
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
                  <Card title={item?.name} bordered={false} className="dashboard-project-card">
                    <p>{item.description}</p>
                    <p>Open tasks</p>
                    <p>Closed tasks</p>
                  </Card>
                )}
              </List.Item>
            )}
          />
        </div>
      </Content>
    </>
  );
};
