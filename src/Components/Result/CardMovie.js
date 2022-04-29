import React from "react";
import styles from "./Card.module.css";
import { Typography, Divider } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
const { Title, Text } = Typography;

function getMonth(numero) {
    let miFecha = new Date();
    if (0 < numero && numero <= 12) {
        miFecha.setMonth(numero - 1);
        return new Intl.DateTimeFormat("es-ES", { month: "long" }).format(miFecha);
    } else {
        return "mes no especificado";
    };
};

export default function CardMovie({movie}) {

    return (
        <div>
            <Divider />
            <div className={styles.title}>
                {
                    movie.original_title ? <Title level={5}>{movie.original_title}</Title> : <Title level={5}>{movie.original_name}</Title>
                }
                <Text> {movie.vote_average}/10 <AiTwotoneStar color="gold" /></Text>
            </div>
            <div className={styles.detailMovie}>
                <img className={styles.imgPoster} src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="Fotografia Actor" />
                <div className={styles.containOverview}>
                    <Text className={styles.overview}>{movie.overview}</Text>
                    {
                        movie.release_date && <Text strong>Fecha de estreno: {movie.release_date.substring(8, movie.release_date.length)} de {getMonth(movie.release_date.substring(6, 7))} de {movie.release_date.substring(0, 4)}</Text>
                    }
                </div>
            </div>
        </div>
    );
};