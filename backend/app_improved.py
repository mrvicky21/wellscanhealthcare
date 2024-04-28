import numpy as np
import cv2
from flask import Flask, render_template, request, url_for, send_from_directory, jsonify
from keras.models import load_model
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
import matplotlib.pyplot as plt
from scipy.ndimage.measurements import label
from flask_cors import CORS

threshold = 0.30
image_size = 224
class_labels = ['meningioma', 'glioma', 'pituitary tumor', 'noTumor']
def mean_iou(y_true, y_pred):
    y_true = tf.cast(y_true, tf.float32)
    y_pred = tf.cast(y_pred >= threshold, tf.float32)  # Assuming binary segmentation with a threshold of 0.22
    intersection = tf.reduce_sum(tf.abs(y_true * y_pred))
    union = tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) - intersection
    return intersection / union

def dice_coefficient(y_true, y_pred, smooth = 1e-5):
    y_true = tf.cast(y_true, tf.float32)
    y_pred = tf.cast(y_pred >= threshold, tf.float32)  
    intersection = tf.reduce_sum(y_true * y_pred)
    union = tf.reduce_sum(y_true) + tf.reduce_sum(y_pred)
    dice = (2. * intersection + smooth) / (union + smooth)
    return dice


custom_objects = {'mean_iou': mean_iou, 'dice_coefficient': dice_coefficient }
model = load_model("D:\\college related\\Fourth year\\final project\\MAJOR PPROJECT (2)\\MAJOR PPROJECT\\backend\\AT_RESu_net_all_STD_0.0927_th=0.38.hdf5", custom_objects=custom_objects)


path = "D:\\college related\\Fourth year\\final project\\MAJOR PPROJECT (2)\\MAJOR PPROJECT\\Blockchain-MedicalRecords-main\\pages"

app = Flask(__name__, template_folder=path, static_folder='static')
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}},  supports_credentials=True)


# Ensure the directory exists
basepath = os.path.dirname(__file__)
upload_folder = os.path.join(basepath, app.config['UPLOAD_FOLDER'])


def preprocessed_img(path):
    v = cv2.imread(path)
    v = cv2.cvtColor(v, cv2.COLOR_BGR2GRAY)

    _, binary = cv2.threshold(v, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[0]
    x1, y1, w, h = cv2.boundingRect(contours)
    v1 = v[y1:y1+h, x1:x1+w]
    v = cv2.resize(v1,(image_size, image_size))

    plt.imsave(path, v, cmap = 'gray')

    mean, std = v.mean(), v.std()
    v = (v - mean) / std
    v = np.expand_dims(v, axis=-1)  # Add a channel dimension
    v = np.expand_dims(v, axis=0)  # Add a batch dimension
    return v

def save_segmented_image(segmented_array, filename):
    segmented_array = (segmented_array >= threshold).astype(np.uint8)
    segmented_array = segmented_array.squeeze()
    segmented_path = os.path.join(upload_folder, 'segmented_' + filename)
    plt.imsave(segmented_path, segmented_array, cmap = 'gray')
    return segmented_array 

def tumor_location(v_path, mask, filename):
    # Label connected components in the binary mask
    labeled_mask, num_features = label(mask)
    if num_features > 0: 

        # Find the largest connected component 
        sizes = [np.sum(labeled_mask == i) for i in range(1, num_features + 1)]
        largest_component = np.argmax(sizes) + 1

        # Find bounding box coordinates of the largest connected component
        coords = np.argwhere(labeled_mask == largest_component)

        # Calculate minimum and maximum values along appropriate axes
        min_vals = np.min(coords, axis=0)
        max_vals = np.max(coords, axis=0)

        # Extract min and max values for y and x
        min_y, min_x = min_vals[0], min_vals[1]
        max_y, max_x = max_vals[0], max_vals[1]
        
    else: # for no tumor
        min_y, min_x = 0, 0
        max_y, max_x = 0, 0
       
    v = cv2.imread(v_path)
    v = cv2.rectangle(v, (min_x, min_y), (max_x, max_y), (255, 0, 0), 1)
    path = os.path.join(upload_folder, 'bbox_' + filename)
    plt.imsave(path, v)

@app.route('/')
def index():
    result = {'prediction': '', 'original_img': '', 'segmented_img': ''}
    return render_template('diagnosis.js', result = result)

@app.route('/predict', methods=['GET', 'POST'])
def predict():
  
    if request.method == 'POST':

        # Get the image file from the request
        f = request.files.get('file')
        
        # Check if the uploads directory exists, if not, create it
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        file_path = os.path.join(upload_folder, secure_filename(f.filename))

        f.save(file_path)
        img_filename = secure_filename(f.filename)

        # Preprocess the image
        img = preprocessed_img(file_path)
        Y_pred1, Y_pred2 = model.predict(img)
        y_pred = np.argmax(Y_pred1, axis=1)
        
        rounded = np.round(Y_pred1 * 100, decimals=4)
        predicted_class = class_labels[y_pred[0]] + ' ' + str(rounded[0][y_pred[0]]) + '%'

         # Save the segmented image
        mask = save_segmented_image(Y_pred2, img_filename)
        tumor_location(file_path, mask, img_filename)

        result = {
            'prediction':  predicted_class, 
            'original_img': url_for('uploaded_file', filename='bbox_' + img_filename), 
            'segmented_img': url_for('uploaded_file', filename='segmented_' + img_filename)
        }
       
        return jsonify(result)
    return None

@app.route('/static/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port = 5000)
    