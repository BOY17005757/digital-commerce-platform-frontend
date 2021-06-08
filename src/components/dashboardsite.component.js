//import packages
import React, { Component } from 'react';

//import styles
import "../styles/tailwind.generated.css";

//import services
import AuthenticationService from "../services/authentication.service";
import ManifestService from "../services/manifest.service";

//define dashboard site class
export default class DashboardSite extends Component {

    //dashboard site constructor
    constructor(props) {

        //allow access to props within constructor
        super(props);

        //assign default state
        this.state = {

            currentUser: AuthenticationService.getCurrentUser(),
            manifest: '',
            redirect: null,
            loading: false

        };

    }

    //invoked after component is mounted
    componentDidMount() {

        //set manifest from prop, convert json to string and format
        this.setState({

            manifest: JSON.stringify(this.props.manifest, undefined, 2)

        })

    }

    //handle form entry
    handleChange(event) {

        this.setState({

            [event.target.id]: event.target.value

        });

    }

    //update manifest
    onSubmit(event) {

        //prevent browser refresh after submit
        event.preventDefault();

        var self = this;

        self.setState({

            message: '',
            loading: true

        });

        ManifestService.editManifest(JSON.parse(self.state.manifest))
            .then(function (collection) {

                if (!collection) {

                    self.setState({

                        showErrorAlert: true,
                        message: collection.data.message

                    });

                } else {

                    window.location.reload();

                }

            })
            .catch(function (error) {

                console.error(error);

                self.setState({

                    showErrorAlert: true

                });

            })
            .finally(function () {

                self.setState({

                    loading: false

                });

            });

    }

    //render dashboard site component
    render() {

        return (
            <div>
                <div className="flex flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mt-8">Site Manifest</h1>
                <p className="text-base text-center text-red-600 mt-4"><b>"name":</b> updates the site name globally.</p>
                <p className="text-base text-center text-red-600"><b>"short_name":</b> updates the PWA site name globally (displayed when installed).</p>
                <form onSubmit={this.onSubmit.bind(this)} className="mt-4">
                    <div className="px-24 py-4">
                        <textarea id="manifest"
                                name="manifest"
                                type="text"
                                value={this.state.manifest}
                                onChange={this.handleChange.bind(this)}
                                className="w-full h-screen p-2 bg-white focus:ring-2 focus:ring-indigo-800 text-gray-900 rounded">
                        </textarea>
                    </div>
                    <div className="flex flex-col mx-auto w-40">
                        <button
                            type="submit"
                            className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5">
                            Edit
                        </button>
                    </div>
                </form>
                </div>
            </div>
        );

    }

}