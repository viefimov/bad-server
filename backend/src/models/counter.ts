import mongoose, { Document, Schema } from 'mongoose'

interface ICounter extends Document {
    sequenceValue: number
}

const counterSchema = new Schema<ICounter>({
    sequenceValue: {
        type: Number,
        required: true,
    },
})

export default mongoose.model<ICounter>('counter', counterSchema)
