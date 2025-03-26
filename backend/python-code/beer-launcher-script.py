import paho.mqtt.client as mqtt

# MQTT Broker Configuration
BROKER = "localhost"
PORT = 1883
TOPIC = "launch-beer"

# Callback when the client receives a connection response from the broker
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
        client.subscribe(TOPIC)
        print(f"Listening to topic: {TOPIC}")
    else:
        print(f"⚠️ Connection failed with code {rc}")

# Callback when a message is received
def on_message(client, userdata, msg):
    print(f"Received message on {msg.topic}: {msg.payload.decode()}")
    # Make robot go brrr here

# Create MQTT client and set up callbacks
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(BROKER, PORT, 60)
    client.loop_forever()
except KeyboardInterrupt:
    print("Stopping MQTT Listener.")
    client.disconnect()
except Exception as e:
    print(f"Error: {e}")