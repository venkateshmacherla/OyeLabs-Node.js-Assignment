from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/database_name'  # Replace with your database configuration
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'phone_number': self.phone_number}

@app.route('/api/customers', methods=['POST'])
def add_customer():
    data = request.json

    # Validate input parameters
    if 'name' not in data or 'phone_number' not in data:
        return jsonify({'error': 'Invalid input parameters'}), 400

    name = data['name']
    phone_number = data['phone_number']

    # Check for duplicates
    if Customer.query.filter_by(phone_number=phone_number).first():
        return jsonify({'error': 'Phone number already exists'}), 409

    # Create a new customer
    customer = Customer(name=name, phone_number=phone_number)

    try:
        db.session.add(customer)
        db.session.commit()
        return jsonify(customer.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error adding customer'}), 500
    finally:
        db.session.close()

if __name__ == '__main__':
    app.run()
