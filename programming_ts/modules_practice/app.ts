import {GreetingService} from './greeting_service';
import $ from './JQuery';

class HelloService implements GreetingService {
    greeting(name:string) {
        return `Hello ${name}`;
    }
}

console.log(new HelloService().greeting('Jeff'));
$().sayHi();