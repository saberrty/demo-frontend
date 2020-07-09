import { action, observable  } from "mobx";
import { setter  } from "mobx-decorators";
import { Api } from "../common/api";

class RootStore {
    @observable users = [];

    @observable self = null;

    @setter
    @observable
    loading = true;

    @action.bound
    login(username, password, history) {
        return Api.request({
            method: "post",
            url: "/users/login",
            data: {
                username,
                password
            }
        }).then(({ data }) => {
            this.self = data.user;
            localStorage.setItem("sessionId",this.self.session_id);
            history.push(`/${data.user.id}`);
        })
    }

    @action.bound
    authSession() {
        const session = localStorage.getItem("sessionId");
        if (session) {
            return Api.request({
                method: "post",
                url: "/users/auth_session",
                data: { session }
            }).then(({ data }) => this.self = data.user)
        }
        return Promise.reject();
    }

    @action.bound
    addUser(username, password, history) {
        return Api.request({
            method: "post",
            url: "/users/create_user",
            data: {
                username,
                password
            }
        }).then(({ data }) => {
            this.self = data.user;
            history.push(`/${data.user.id}`);
        })
    }

    @action.bound
    deleteUser(username) {
        return Api.request({
            method: "post",
            url: "/users/delete_user",
            data: { username }
        }).then(({ data }) => this.users = data.users)
    }

    @action.bound
    getUsers() {
        return Api.request({
            method: "get",
            url: "/users/users_list"
        }).then(({ data }) => this.users = data.users)
    }
}

const rootStore = new RootStore();
export default rootStore;
