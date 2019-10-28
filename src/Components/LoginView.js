import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LoginView.css';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.googleApi = this.googleApi.bind(this);
    }

    googleApi(e) {
        e.preventDefault();
        return 0;
    }

    render() {
        return (
            <div className="signin-bg-image">
                <div className="container-fluid">
                    <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
                        <div className="card card-signin shadow rounded">
                            <div class="card-body">
                                <h5 class="card-title text-center">Sign In</h5>
                                <form class="form-signin">
                                <div class="form-label-group">
                                    <label for="inputEmail">Email address</label>
                                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                                </div>

                                <div class="form-label-group">
                                    <label for="inputPassword">Password</label>
                                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                                </div>

                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                <hr class="my-4"/>
                                <button class="btn btn-lg btn-google btn-block text-uppercase" onClick={this.googleApi}><FontAwesomeIcon color="white" icon={['fab', 'google']}/> Sign in with Google</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginView;