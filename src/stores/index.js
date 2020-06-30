import { action, computed, observable  } from "mobx";
import { setter  } from "mobx-decorators";
import { Api } from "../common/api";

class RootStore {
    @action.bound
    addUser() {
        Api.request({
            method: "post",
            url: "/users/login",
            data: {
                username: "test",
                password: "123456"
            }
        })
    }
}

const rootStore = new RootStore();
export default rootStore;
