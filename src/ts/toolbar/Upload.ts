import uploadSVG from "../../assets/icons/upload.svg";
import {Constants} from "../constants";
import {uploadFiles} from "../upload/index";
import {MenuItem} from "./MenuItem";

export class Upload extends MenuItem {
    constructor(vditor: IVditor, menuItem: IMenuItem) {
        super(vditor, menuItem);
        let inputHTML = '<input type="file"';
        if (vditor.options.upload.multiple) {
            inputHTML += ' multiple="multiple"';
        }
        if (vditor.options.upload.accept) {
            inputHTML += ` accept="${vditor.options.upload.accept}"`;
        }
        this.element.children[0].innerHTML = `${(menuItem.icon || uploadSVG)}${inputHTML}>`;
        this._bindEvent(vditor);
    }

    public _bindEvent(vditor: IVditor) {
        this.element.querySelector("input").addEventListener("change",
            (event: InputEvent & { target: HTMLInputElement }) => {
                if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
                    return;
                }
                if (event.target.files.length === 0) {
                    return;
                }
                uploadFiles(vditor, event.target.files, event.target);
            });
    }
}
