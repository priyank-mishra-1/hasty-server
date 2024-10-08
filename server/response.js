class Response {
    constructor(socket) {
        this.socket = socket;
    }

    // Method to set status code
    sendStatus(code) {
        this.statusCode = code;
        return this;
    }

    // Method to set headers
    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    // Method to send a response with a body
    send(body) {
        const response = `HTTP/1.1 200 OK\n\n${body}`;
        this.socket.write(response); // Send the complete response
        this.socket.end(); // End the connection
    }

    // Method to send only the status
    sendStatus(statusCode) {
	const response = `HTTP/1.1 ${statusCode} \n\n`;
	this.socket.write(response); // Send the complete response
        this.socket.end(); // End the connection
    }

    // Helper method to format headers
    formatHeaders() {
        return Object.keys(this.headers)
            .map(key => `${key}: ${this.headers[key]}`)
            .join('\r\n');
    }

	json(data){
		data = JSON.stringify(data);
		const  response = `HTTP/1.1 200 OK\nContent-Type: application/json\n\n${data}`;
		this.send(response);
	}
}

module.exports = Response;

