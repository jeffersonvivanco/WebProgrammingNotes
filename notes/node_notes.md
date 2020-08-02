# NodeJS notes

## Useful V8 options
### `--max-old-space-size=SIZE` (in Mbytes)
Sets the max memory size of V8's old memory section. As memory consumption approaches the limit, V8 will spend more time
on garbage collection in an effort to free unused memory. On a machine with 2GB of memory, consider setting this to
1536 (1.5GB) to leave some memory for other uses and avoid swapping. `$ node --max-old-space-size=1536 index.js`

## 7 key Node.js advantages to develop scalable web apps
1. High-Performance for Real-Time applications

   Web apps powered by Node.js benefit massively from its ability to multitask. Unlike other platforms, its single-threaded,
   event-driven architecture processes multiple concurrent requests efficiently without clogging the RAM. Morover, its event
   loop and non-blocking I/O operations allow code execution at a pace which significantly impacts the application's overall
   performance.
   
   What fuels Node.js with this superpower is that it's built on Google Chrome's V8 engine and written in C++. It breaks
   JS functions into machine codes with high efficiency and speed.
   
2. Easy scalability of Modern Applications
   
   The cutting-edge technology comes with tons of features like the cluster module. It facilitates load balancing over
   multiple CPU cores, making it easy to deliver desired outcomes through smaller modules without burning out the RAM process.
   Additionally, Node.js employs a non-blocking event-loop mechanism with high scalability and enables the server to process
   requests seamlessly.
   
   From the development standpoint, Node.js allows you to leverage microservices that further let you segregate your app
   into smaller parts. Nodejs and microservices allow modern applications to scale up and down as per need and help companies
   achieve high performance with fewer resources.
   
3. Vibrant community support
4. Easy to learn and quick to adapt
5. Extensibility to meet customized requirements
6. Reduces load time by quick caching

   Nodejs has made it easy for developers to reduce task workload and re-execution of code with its caching module. Every
   time the first module of your web application gets a request, it gets cached in the in-app memory. This way, within
   a fraction of microseconds, your users get to quicky access the web pages without having to wait for too long.
7. Gives freedom to build cross-platform applications

   With Nodejs, you can leverage platforms like Electron and NW.js to build cross-platform real-time web applications.
