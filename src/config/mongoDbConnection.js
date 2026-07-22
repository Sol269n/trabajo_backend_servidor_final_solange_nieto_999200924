import { connect } from 'mongoose';

const connectDb = async () => {
    try {
        await connect(process.env.URI_DB);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.log("❌ Error al conectarse a MongoDB", error);
    }
};

export { connectDb };