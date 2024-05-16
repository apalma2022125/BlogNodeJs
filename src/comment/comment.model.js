import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    autorName:{
        type: String,
        required: [true, 'The autor is required']
    },
    date:{
        type: Date,
        required: [true, 'The date is required']
    },
    commentText: {
        type: String,
        required: [true, 'The title is required']
    },
    idPublication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication'
    },
    estado: {
        type: Boolean,
        default: true
    },
});

CommentSchema.methods.toJSON = function(){
    const {__v, _id, ...comment} = this.toObject();
    comment.commentId = _id;
    return comment;
}

export default mongoose.model('Comment', CommentSchema)