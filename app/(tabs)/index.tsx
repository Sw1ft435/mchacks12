import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';

// Function to validate the API key by making a test API request
const isApiKeyValid = async (apiKey: string) => {
  try {
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    // If we get a response, the key is valid
    return response.status === 200;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;  // Invalid API key
  }
};

// Function to get bot response based on the message
const getBotResponse = async (message: string, apiKey: string) => {
  const apiKeyValid = await isApiKeyValid(apiKey);

  if (!apiKeyValid) {
    return 'Invalid API key. Please check your API key and try again.';
  }
  try {
    // Call OpenAI API with the key
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text.trim();  // Return the AI response text
  } catch (error) {
    console.error('Error getting response from OpenAI:', error);
    return 'Error getting AI response.';
  }
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<any[]>([]);  // Array to store chat logs
  const [inputText, setInputText] = useState('');  // State for user's input
  const [apiKey, setApiKey] = useState('');  // State for API Key input

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      // Add user message to chat
      setMessages([...messages, { sender: 'user', text: inputText }]);
      
      // Get bot response
      const botMessage = await getBotResponse(inputText, apiKey);
      
      // Add bot response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botMessage },
      ]);
      
      setInputText(''); // Clear input field after sending message
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Backdrop.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Image
          source={require('@/assets/images/Logo.png')}  // Your UnHinge logo
          style={styles.logo}
        />
        <ThemedText type="title">Engage with AI, with a twist.</ThemedText>
      </ThemedView>

      <View style={styles.apiKeyContainer}>
        <TextInput
          style={styles.apiKeyInput}
          placeholder="Enter your OpenAI API Key"
          value={apiKey}
          onChangeText={setApiKey}
        />
        <TouchableOpacity style={styles.apiKeyButton} onPress={() => {}}>
          <ThemedText type="defaultSemiBold">Save API Key</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView contentContainerStyle={styles.chatLog}>
          {messages.map((msg, index) => (
            <ThemedView
              key={index}
              style={[styles.chatBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble]}
            >
              <ThemedText>{msg.text}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <ThemedText type="defaultSemiBold">Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>
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
    padding: 16,
  },
  logo: {
    height: 40,
    width: 120,
  },
  apiKeyContainer: {
    padding: 16,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  apiKeyInput: {
    width: '80%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  apiKeyButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  chatContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  chatLog: {
    flexGrow: 1,
    justifyContent: 'flex-end',
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
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginLeft: 8,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
