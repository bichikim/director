import _ from 'lodash';
export default {
    video: {
        callback(displayLogic){
            if (_.isArray(displayLogic.videos)) {
                this._renderers.video.render(displayLogic.videos)
            }
        },
    },
    image: {
        callback(displayLogic){
            if (_.isArray(displayLogic.images)) {
                this._renderers.image.render(displayLogic.images)
            }
        },
    },
    animation: {
        callback(displayLogic){
            if (_.isArray(displayLogic.animations)) {
                this._renderers.animation.render(displayLogic.animations)
            }
        },
    },
    button: {
        callback(displayLogic){
            if (_.isArray(displayLogic.buttons)) {
                this._renderers.rectangle.render(displayLogic.buttons)
            }
        },
    },
    text: {
        callback(displayLogic){
            if (_.isArray(displayLogic.texts)) {
                this._renderers.text.render(displayLogic.texts)
            }
        },
    },
}