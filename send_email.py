#!/usr/bin/env python3
"""
Simple Flask server to handle contact form submissions via email
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import re

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'your-email@gmail.com')
SENDER_PASSWORD = os.environ.get('SENDER_PASSWORD', 'your-app-password')
RECIPIENT_EMAIL = "felipe.medina98@gmail.com"

def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route('/api/send-email', methods=['POST'])
def send_email():
    """Handle form submission and send email"""
    try:
        data = request.get_json()
        
        # Validate input
        from_name = data.get('from_name', '').strip()
        from_email = data.get('from_email', '').strip()
        message = data.get('message', '').strip()
        
        if not from_name or not from_email or not message:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        if not is_valid_email(from_email):
            return jsonify({'success': False, 'error': 'Invalid email format'}), 400
        
        # Create email
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"Nuevo mensaje de contacto de {from_name}"
        
        # Email body
        body = f"""
        Nuevo mensaje de contacto desde tu portfolio:
        
        Nombre: {from_name}
        Email: {from_email}
        
        Mensaje:
        {message}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        
        return jsonify({'success': True, 'message': 'Email sent successfully'}), 200
    
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port=5000)
