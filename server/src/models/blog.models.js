import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
)

blogSchema.plugin(mongooseAggregatePaginate);
export const Blog = mongoose.model("Blog", blogSchema);