import _ from 'lodash';
export default class Button {
    static make(displayObject, buttonLogic, actions) {
        displayObject.interactive = true;
        displayObject.buttonMode = true;
        if (_.isObject(buttonLogic)) {
            if (_.isString(buttonLogic.click)) {
                const callback = Button.makeCallback(displayObject, buttonLogic.click, actions);
                displayObject.on('tap', callback);
                displayObject.on('click', callback);
            }
            if (_.isString(buttonLogic.hover)) {
                const callback = Button.makeCallback(displayObject, buttonLogic.hover, actions);
                displayObject.on('mouseover', callback);
            }
        }
    }

    static makeCallback(displayObject, stringLogic, actions) {
        const callbacks = [],
            parts = stringLogic.split('&');
        _.forEach(parts, (part) => {
            const myParts = part.split('=');
            switch (myParts[0]) {
                case 'effect' :
                    callbacks.push(
                        ((myAction, myDisplayObject, myNumber) => {
                            return () => {
                                myAction(myDisplayObject, myNumber);
                            }
                        })(actions.effect, displayObject, myParts[1])
                    );
                    break;
                case 'display' :
                    callbacks.push(
                        ((myAction, myData) => {
                            return () => {
                                myAction(myData);
                            }
                        })(actions.display, myParts[1])
                    );
                    break;
                case 'share' :
                    callbacks.push(
                        ((myAction, myData) => {
                            return () => {
                                myAction(myData);
                            }
                        })(actions.share)
                    );
                    break;
                case 'side' :
                    callbacks.push(
                        ((myAction, mySide) => {
                            return () => {
                                myAction(mySide);
                            }
                        })(actions.side, myParts[1])
                    );
                //no default
            }
        });

        return ((myCallbacks) => {
            return () => {
                myCallbacks.forEach((value) => {
                    value();
                });
            };
        })(callbacks);
    }
}