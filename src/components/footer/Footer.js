import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <div className="bg-dark">
                <div className="container text-light text-center py-3 d-flex justify-content-around align-items-center" >
                    <div>
                        <div>
                            <h3>MKZ Pizza</h3>
                            <small>© Copyright</small>
                        </div>
                    </div>
                    <div>
                        <div>Mustafa Zaimoğlu</div>
                        <div>2021</div>
                    </div>
                </div>
            </div>
        );
    }
}
