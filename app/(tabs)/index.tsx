import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';

// Function to get bot response based on the message and valid API key
const getBotResponse = async (message: string, apiKey: string) => {
  if (!apiKey) {
    return 'No API key detected. Please enter a valid Gemini API key to interact.';
  }

  try {
    const response = await axios.post(
      'https://api.gemini.com/v1/completions', 
      {
        prompt: message,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text.trim(); 
  } catch (error: unknown) {
    return 'An unexpected error occurred.';
  }
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'user', text: inputText }]);

      const botMessage = await getBotResponse(inputText, apiKey);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botMessage },
      ]);

      setInputText(''); // Clear input field after sending message
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#101314' }} // Updated header color
      headerImage={
        <Image
          source={require('@/assets/images/Backdrop.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Adjusted titleContainer to match the height of the API key button */}
      <ThemedView style={styles.titleContainer}>
        <Image
          source={require('@/assets/images/Logo.png')} // Your UnHinge logo
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.smallerTitle}>Engage with AI, with a twist.</ThemedText>
      </ThemedView>

      {/* API Key Section moved to top-right */}
      <View style={styles.apiKeyContainer}>
        <TextInput
          style={styles.apiKeyInput}
          placeholder="Enter API Key..."
          placeholderTextColor="#CCCCCC"  // Same placeholder text color as the message input
          value={apiKey}
          onChangeText={setApiKey}
        />
        <TouchableOpacity style={styles.apiKeyButton} onPress={() => {}}>
          <ThemedText type="defaultSemiBold">Save</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        {/* Scrollable area for messages only */}
        <ScrollView
          contentContainerStyle={styles.chatLog}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, index) => (
            <ThemedView
              key={index}
              style={[
                styles.chatBubble,
                msg.sender === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <ThemedText>{msg.text}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        {/* Fixed input area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#CCCCCC" // Placeholder text color for better readability
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <ThemedText type="defaultSemiBold">Send</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    backgroundColor: '#151718',
    marginTop: 0, // Moved up even further, set marginTop to 0
  },
  logo: {
    height: 100,
    width: 130,
  },
  smallerTitle: {
    fontSize: 18, 
  },
  // API Key Section moved and resized
  apiKeyContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10, // Make sure it's above other content
  },
  apiKeyInput: {
    height: 40, // Same height as the message input field
    width: 180, // Wider width to accommodate the placeholder
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A', 
    color: '#FFFFFF', 
    fontSize: 16,  // Match the font size with message input
  },
  apiKeyButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#151718',
    padding: 20,
  },
  chatLog: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#808080',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#151718', 
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 35,
    backgroundColor: '#2A2A2A', 
    color: '#FFFFFF', 
    fontSize: 16,  // Set font size to match
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginLeft: 8,
  },
});
