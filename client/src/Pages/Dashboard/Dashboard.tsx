import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Button, List } from "antd";
import { ProjectCard } from "../../Components/Common/ProjectCard/ProjectCard";
import { ProjectCardSkeleton } from "../../Components/Common/ProjectCard/ProjectCardSkeleton";
import { CreateProjectModal } from "../../Modals/CreateProjectModal/CreateProjectModal";
import { IState } from "../../Store/reducers";
import { IProject } from "../../Interfaces/tasks";
import { MODAL_TYPE } from "../../Constants/tasks";
import "./dashboard.scss";

const { Content } = Layout;

interface IModal {
  open: boolean;
  type: number;
}

export const Dashboard: React.FC = () => {
  const { projects, isFetching } = useSelector((state: IState) => state.project);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [modal, setModal] = useState<IModal>({ open: false, type: MODAL_TYPE.CREATE });

  const onClickEdit = (item: IProject) => {
    setModal({ open: true, type: MODAL_TYPE.EDIT });
    setSelectedProject(item);
  };

  return (
    <Content className="Dashboard">
      <div className="dashboard-title-wrapper">
        <h2 className="dashboard-title">My Dashboard</h2>
        <Button type="primary" onClick={() => setModal({ open: true, type: MODAL_TYPE.CREATE })}>
          Create project
        </Button>
      </div>
      <div className="dashboard-projects__wrapper">
        <h3 className="dashboard-projects__title">Open Projects</h3>
        {projects && !isFetching ? (
          <List
            grid={{ column: 4, gutter: 16, xs: 1, sm: 3, lg: 4 }}
            dataSource={projects}
            renderItem={(item: IProject) => (
              <List.Item>
                {projects && (
                  <>
                    <NavLink to={`/projects/${item.id}`}>
                      <ProjectCard item={item} onClickEdit={onClickEdit} />
                    </NavLink>
                  </>
                )}
              </List.Item>
            )}
            loading={isFetching}
          />
        ) : (
          <List
            grid={{ column: 4, gutter: 16, xs: 1, sm: 3, lg: 4 }}
            dataSource={[1, 2, 3]}
            renderItem={() => (
              <List.Item>
                <ProjectCardSkeleton />
              </List.Item>
            )}
          />
        )}
      </div>
      {modal.open && (
        <CreateProjectModal
          modal={modal}
          setModal={setModal}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </Content>
  );
};
