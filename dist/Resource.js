"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Resource = /** @class */ (function () {
    function Resource(options) {
        this.HTTPMethod = ["get", "delete", "head", "options", "post", "put", "patch"];
        this.actions = {};
        this.baseURL = options.baseURL;
        this.actions = {};
        this.state = options.state || {};
        this.axios = options.axios || axios_1.default;
        this.queryParams = options.queryParams || false;
    }
    Resource.prototype.add = function (options) {
        var _this = this;
        options.method = options.method || "get";
        options.requestConfig = options.requestConfig || {};
        options.property = options.property || null;
        if (this.HTTPMethod.indexOf(options.method) === -1) {
            var methods = this.HTTPMethod.join(", ");
            throw new Error("Illegal HTTP method set. Following methods are allowed: " + methods + ". You chose \"" + options.method + "\".");
        }
        var completePathFn;
        if (typeof options.path === "function") {
            var pathFn_1 = options.path;
            completePathFn = function (params) { return _this.normalizedBaseURL + pathFn_1(params); };
        }
        else {
            completePathFn = function () { return _this.normalizedBaseURL + options.path; };
        }
        this.actions[options.action] = {
            requestFn: function (params, data) {
                if (params === void 0) { params = {}; }
                if (data === void 0) { data = {}; }
                var queryParams;
                // use action specific queryParams if set
                if (options.queryParams !== undefined) {
                    queryParams = options.queryParams;
                    // otherwise use Resource-wide queryParams
                }
                else {
                    queryParams = _this.queryParams;
                }
                var requestConfig = Object.assign({}, options.requestConfig);
                var paramsSerializer = options.requestConfig["paramsSerializer"] !== undefined ||
                    _this.axios.defaults.paramsSerializer !== undefined;
                if (queryParams || paramsSerializer) {
                    requestConfig["params"] = params;
                }
                if (["post", "put", "patch"].indexOf(options.method) > -1) {
                    return _this.axios[options.method](completePathFn(params), data, requestConfig);
                }
                else {
                    return _this.axios[options.method](completePathFn(params), requestConfig);
                }
            },
            property: options.property,
            onSuccess: options.onSuccess,
            onError: options.onError,
            dispatchString: this.getDispatchString(options.action),
            commitString: this.getCommitString(options.action),
            axios: this.axios
        };
        return this;
    };
    Object.defineProperty(Resource.prototype, "normalizedBaseURL", {
        get: function () {
            return this.baseURL || this.axios.defaults.baseURL || "";
        },
        enumerable: true,
        configurable: true
    });
    Resource.prototype.getDispatchString = function (action) {
        return action;
    };
    Resource.prototype.getCommitString = function (action) {
        var capitalizedAction = action.replace(/([A-Z])/g, "_$1").toUpperCase();
        return capitalizedAction;
    };
    return Resource;
}());
exports.Resource = Resource;
exports.default = Resource;
