import numpy as np
import sounddevice as sd
import threading
from scipy.io.wavfile import write

def recording():
    fs = 44100  # Sample rate
    frames = []  # To store recorded audio chunks
    is_recording = False

    # Dynamically determine the number of input channels or default to 1
    try:
        input_device_info = sd.query_devices(kind='input')
        channels = input_device_info['max_input_channels']
        if channels < 1:
            raise ValueError("No valid input channels found.")
    except Exception as e:
        print(f"Error detecting input channels: {e}. Defaulting to 1 channel.")
        channels = 1

    def callback(indata, frame_count, time_info, status):
        """Callback function to collect audio data."""
        if status:
            print(f"Recording error: {status}")
        frames.append(indata.copy())

    def record_audio():
        nonlocal is_recording
        print("Recording started. Press Enter to stop.")
        is_recording = True
        with sd.InputStream(samplerate=fs, channels=channels, callback=callback):
            while is_recording:
                sd.sleep(100)

    def save_audio():
        print("Recording stopped. Saving file...")
        audio_data = np.concatenate(frames, axis=0)
        # Normalize and convert to int16 for WAV saving
        audio_data = np.int16(audio_data / np.max(np.abs(audio_data)) * 32767)
        write('output.wav', fs, audio_data)
        print("File saved as output.wav")

    print("Press Enter to start recording.")
    input()
    recording_thread = threading.Thread(target=record_audio, daemon=True)
    recording_thread.start()

    input("Recording... Press Enter to stop recording.")  # Wait for Enter key
    print("Stopping recording...")
    is_recording = False
    recording_thread.join()  # Wait for recording thread to finish
    save_audio()
