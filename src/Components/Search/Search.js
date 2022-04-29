import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadActorName } from "../../Redux/actions";
import styles from "./Search.module.css";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { Upload, message, Typography, Layout} from "antd";
const { Dragger } = Upload;
const { Title } = Typography;
const { Content } = Layout;
const apiKeyNomada = process.env.REACT_APP_KEY_WHOIS;

export default function Search() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const props = {
        name: "file",
        action: "https://whois.nomada.cloud/upload",
        headers: {
            Nomada: apiKeyNomada,
        },
        beforeUpload: file => {
            const isPNGorJPG = file.type === "image/png" || file.type === "image/jpeg";
            if (!isPNGorJPG) {
                message.error(`${file.name} is not a png, jpg or jpeg file`);
            };
            return isPNGorJPG || Upload.LIST_IGNORE;
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            };
            if (status === "done") {
                dispatch(loadActorName(info.file));
                message.success(`${info.file.name} file uploaded successfully.`);
                navigate("/result");
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            };
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <div>
                    <Title strong level={2}>¿Quién es este actor?</Title>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <AiOutlineFolderOpen className={styles.icon}/>
                        </p>
                        <p className="ant-upload-text">Haz click o arrastra una imagen</p>
                        <p className="ant-upload-hint" style={{padding: "0 2rem"}}>
                            Selecciona la foto de un actor famoso para conocer quién es y en qué películas ha salido
                        </p>
                    </Dragger>
                </div>
            </Content>
        </Layout>
    )
}
