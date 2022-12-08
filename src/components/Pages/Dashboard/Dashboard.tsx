import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Checkbox, Space, Alert, Button, List, Card } from "antd";
import useTasks from "../../Hooks/useTasks";
import { ProjectService } from "../../API/ProjectService";
import { ITask } from "../../Interfaces/tasks";
import "./dashboard.scss";

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  const { getProjects } = useTasks();
  const { projects, isFetching } = useSelector((state: any) => state);

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
            renderItem={(item) => (
              <List.Item>
                {projects && (
                  //@ts-ignore
                  <Card title={item?.name} bordered={false} className="dashboard-project-card">
                    <p>
                      {
                        //@ts-ignore
                        item.description
                      }
                    </p>
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
