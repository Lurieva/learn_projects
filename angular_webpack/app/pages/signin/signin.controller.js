'use strict';

class SigninController {
    constructor() {
        "ngInject"
        this.name = 'signin';
        this.master = {};
        this.reset = function () {
            this.user = angular.copy(this.master);
        }

    }
}

export default SigninController;
