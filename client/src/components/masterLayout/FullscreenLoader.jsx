import React, { Fragment } from 'react';
const FullscreenLoader = () => {
    return (
        <Fragment>
            <div className={" LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate" />
                </div>
            </div>
        </Fragment>
    );
};
export default FullscreenLoader;