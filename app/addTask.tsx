import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddTask() {
    const router = useRouter();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleCreateTask = () => {
        // TODO: Implement task creation logic
        console.log('Creating task:', { taskTitle, taskDescription, dueDate });
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Task</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={taskTitle}
                onChangeText={setTaskTitle}
            />
            
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Task Description"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
                numberOfLines={4}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />

            <View style={styles.buttonContainer}>
                <Pressable 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                
                <Pressable 
                    style={[styles.button, styles.createButton]} 
                    onPress={handleCreateTask}
                >
                    <Text style={styles.buttonText}>Create Task</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: '#ff4444',
    },
    createButton: {
        backgroundColor: '#03A9F4',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

