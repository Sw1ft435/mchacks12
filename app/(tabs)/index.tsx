/*import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import ChatBoxInterface from '@/components/ui/ChatbotInterface';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});*/

/*import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// Sample bot response function (mocking AI response)
const getBotResponse = (message: string) => {
  return `Bot says: You said "${message}"`;
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<any[]>([]);  // Array to store chat logs
  const [inputText, setInputText] = useState('');  // State for user's input

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // Add user message
      setMessages([...messages, { sender: 'user', text: inputText }]);
      // Add bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: getBotResponse(inputText) },
      ]);
      setInputText(''); // Clear input after sending
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/Logo.png')} // Your UnHinge logo
          style={styles.logo}
        />
        <ThemedText type="title">Chat with AI</ThemedText>
      </ThemedView>

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

      <ThemedView style={styles.footerContainer}>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

/////////////////////////////

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  logo: {
    height: 50,
    width: 150,
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
    borderRadius: 25,
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
});*/

import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import axios from 'axios';

const OPENAI_API_KEY = 'your-openai-api-key-here';  // Replace with your OpenAI API key

// Sample function to call OpenAI API
const getBotResponse = async (message: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',  // GPT-3 model (you can also use other models like GPT-4 if available)
        prompt: message,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();  // Return the AI response text
  } catch (error) {
    console.error('Error getting response from OpenAI:', error);
    return 'Sorry, I couldn’t understand that. Could you try again?';  // Fallback error message
  }
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<any[]>([]);  // Array to store chat logs
  const [inputText, setInputText] = useState('');  // State for user's input

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      // Add user message to chat
      setMessages([...messages, { sender: 'user', text: inputText }]);
      
      // Get bot response
      const botMessage = await getBotResponse(inputText);
      
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
