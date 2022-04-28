import React from 'react'
import styles from "./Result.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { loadActorDetail } from '../../Redux/actions';
import { Typography, Layout, Space, Divider, Tag, Button, Modal } from 'antd';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { AiTwotoneStar } from "react-icons/ai"
/* const { Dragger } = Upload;
const { Title } = Typography; */
const { Content } = Layout
const { Title, Text } = Typography;


function getMonth (numero) {
    let miFecha = new Date();
    if (0 < numero && numero <= 12) {
      miFecha.setMonth(numero - 1);
      return new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(miFecha);
    } else {
      return null;
    }
  }

export default function Result() {

    const navigate = useNavigate()
    const { actorName, actorDetail } = useSelector(state => state)
    const [index, setIndex] = React.useState(0)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = React.useState(true);
    const id = React.useId()
    const { Sider, Content } = Layout;

    React.useEffect(() => {
        dispatch(loadActorDetail(actorName))
        /* return () => dispatch(loadActorDetail("clean")) */
    }, [])

    const selectActor = (i) => {
        setIndex(i)
        setShowModal(false)
    }

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Space>
                    <Button type='primary' icon={<FaArrowLeft />} onClick={() => navigate("/")}>
                        Regresar
                    </Button>
                </Space>
                {
                    actorDetail.length && actorDetail.length > 1 ?
                        <Modal
                            title="Seleccione el actor correcto"
                            visible={showModal}
                            closable={false}
                            className={styles.modal}
                            footer={null}
                        >
                            <Space size='large' wrap={true} align="center">
                                {
                                    actorDetail.map((actor, i) =>
                                        <div key={id + actor.id} onClick={() => selectActor(i)}>
                                            {
                                                actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} />
                                            }
                                            <p>{actor.name}</p>
                                        </div>
                                    )
                                }
                            </Space>
                        </Modal> : ""
                }
                <Layout>

                    {
                        actorDetail[index] &&
                        <Sider theme='light' breakpoint='xs' width={"15vw"} className={styles.sider}>
                            {
                                actorDetail[index].profile_path ? <img src={`https://image.tmdb.org/t/p/w200/${actorDetail[index].profile_path}`} className={styles.img}/> : "No tiene fotografia"
                            }
                            <Title level={4}>{actorDetail[index].name}</Title>
                            <Tag color="gold" className={styles.gender}>{actorDetail[index].gender === 1 ? "Mujer" : "Hombre"}</Tag>
                            <Text level={5} className={styles.popularity}>popularidad: {actorDetail[index].popularity}</Text>
                        </Sider>
                    }


                    <Layout>
                        <Content className={styles.description}>
                            <Title level={3}>Películas:</Title>
                               
                            {
                                actorDetail[index] && actorDetail[index].known_for.map(movie => 
                                    <div /* className={styles.containMovie} */>
                                        <Divider />
                                        <div className={styles.title}>
                                            {
                                                movie.original_title ? <Title level={5}>{movie.original_title}</Title> : <Title level={5}>{movie.original_name}</Title>
                                            }
                                            <Text> {movie.vote_average}/10 <AiTwotoneStar /></Text>
                                        </div>
                                        <div className={styles.detailMovie}>
                                            <img className={styles.imgPoster} src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                                            <div className={styles.containOverview}>
                                                <Text className={styles.overview}>{movie.overview}</Text>
                                                {
                                                    movie.release_date && <Text strong>Fecha de estreno: {movie.release_date.substring(8, movie.release_date.length)} de {getMonth(movie.release_date.substring(6, 7))} de {movie.release_date.substring(0,4)}</Text>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                )
                            }
                        </Content>
                    </Layout>
                </Layout>
            </Content>


        </Layout>
    )
}