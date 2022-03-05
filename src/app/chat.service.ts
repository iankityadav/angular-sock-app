import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

export class ChatService {
    private url = 'http://localhost:3000/'
    private socket

    constructor(){
        this.socket = io(this.url)
    }

    public sendMessage(message: string){
        this.socket.emit('new-message', message)
        console.log("sent "+message);
        
        this.socket.send("new-message")
    }

    public getMessage(){
        return new Observable((observer)=>{
            this.socket.on('new-message', (message)=>{
                observer.next(message)
            })
        })
    }

}