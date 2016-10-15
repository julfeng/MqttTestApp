export class LogMsg {
    type: string;
    content: string;
    createdTime: number;
    className: string;

    constructor(_type: string, _content: string) {
        this.type = _type;
        this.content = _content;
        this.createdTime = Date.now();
        if (this.type === 'success') {
            this.className = 'list-group-item-info';
        } else {
            this.className = 'list-group-item-danger';
        }
    }

}