import React from "react";
import styles from "./Result.module.css";
import imgDefault from "../../images/default.png";
import { useDispatch, useSelector } from "react-redux";
import { loadActorDetail } from "../../Redux/actions";
import { Typography, Layout, Space, Tag, Button, Modal } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardMovie from "./CardMovie";
const { Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function Result() {

    const navigate = useNavigate();
    const { actorName, actorDetail } = useSelector(state => state);
    const [index, setIndex] = React.useState(0);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = React.useState(true);
    const id = React.useId();

    React.useEffect(() => {
        dispatch(loadActorDetail(actorName));
        return () => dispatch(loadActorDetail("clean"))
    }, [dispatch, actorName]);

    const selectActor = (i) => {
        setIndex(i);
        setShowModal(false);
    };

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Space>
                    <Button type="primary" icon={<FaArrowLeft />} onClick={() => navigate("/")} className={styles.buttonBack}>
                        Regresar
                    </Button>
                </Space>
                {
                    actorDetail.length && actorDetail.length > 1 ? (
                        <Modal
                            title="Seleccione el actor correcto"
                            visible={showModal}
                            closable={false}
                            className={styles.modal}
                            footer={null}
                        >
                            <Space size="large" wrap={true} align="center">
                                {
                                    actorDetail.map((actor, i) =>
                                        <div key={id + actor.id} onClick={() => selectActor(i)} className={styles.detailModal}>
                                            {
                                                actor.profile_path ? 
                                                    <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt="Fotografia Actor"/>
                                                : <img src={imgDefault} alt="Fotografia Actor"  style={{width: "200px"}}/>
                                            }
                                            <p>{actor.name}</p>
                                        </div>
                                    )
                                }
                            </Space>
                        </Modal> 
                    ) : ""   
                }
                <Layout>
                    {
                        actorDetail[index] &&
                        <Sider theme="light" breakpoint="xs" width={"15vw"} className={styles.sider}>
                            {
                                actorDetail[index].profile_path ? 
                                    <img src={`https://image.tmdb.org/t/p/w200/${actorDetail[index].profile_path}`} className={styles.img} alt="Fotografia Actor" />
                                : <img src={imgDefault} alt="Fotografia Actor" className={styles.img} />
                            }
                            <Title level={4}>{actorDetail[index].name}</Title>
                            <Tag color="gold" className={styles.gender}>{actorDetail[index].gender === 1 ? "Mujer" : "Hombre"}</Tag>
                            <Text level={5} className={styles.popularity}>popularidad: {Number(actorDetail[index].popularity).toFixed(2)}</Text>
                        </Sider>
                    }
                    <Layout>
                        <Content className={styles.description}>
                            <Title level={2}>Películas:</Title>
                            {
                                actorDetail[index] && actorDetail[index].known_for.map(movie => <CardMovie movie={movie} key={id + movie.original_title}/>)
                            }
                        </Content>
                    </Layout>
                </Layout>
            </Content>
        </Layout>
    );
};