import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/shadcn/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

const ReplySection = ({ 
    replies, 
    restaurantName, 
    fetchReplies,
    isLoggedIn,
    userId,
    isReviewOwner,
    restaurantId
 }) => {
    const [editingReplyId, setEditingReplyId] = useState(null); // Tracks the reply being edited
    const [editedReplyText, setEditedReplyText] = useState(''); // Tracks the text of the edited reply
    const [deleteConfirmId, setDeleteConfirmId] = useState(null); // Tracks the reply being deleted

    // Edit a reply
    const handleEditReply = async (replyId, newText) => {
        try {
            const token = localStorage.getItem('token'); // Assuming auth token is stored in localStorage
            const response = await fetch(`http://localhost:5000/api/responses/${replyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ replyText: newText }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit reply');
            }

            window.location.reload();

            await fetchReplies(); // Refresh replies
        } catch (error) {
            console.error('Error editing reply:', error);
        } finally {
            setEditingReplyId(null);
            setEditedReplyText('');
        }
    };

    const isOwnReply = (ownerId) => {
        return ownerId === restaurantId || ownerId=== userId

    }

    // Delete a reply
    const handleDeleteReply = async (replyId) => {
        try {
            const token = localStorage.getItem('token'); // Assuming auth token is stored in localStorage
            const response = await fetch(`http://localhost:5000/api/responses/${replyId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete reply');
            }
            window.location.reload();

            await fetchReplies();    

        } catch (error) {
            console.error('Error deleting reply:', error);
        } finally {
            setDeleteConfirmId(null);
        }
    };

    if (!replies || replies.length === 0) return null;

    return (
        <div className="border-t border-gray-200 mt-4 p-4 rounded-lg">
            <div className="space-y-3">
                {replies.map((reply) => (
                    <div key={reply._id} className="relative flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 font-medium mb-2">
                                Reply from <span className="text-primary">{reply.username}</span>:
                            </p>
                            <div className="border-b last:border-none pb-3">
                                {editingReplyId === reply._id ? (
                                    <div>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
                                            value={editedReplyText}
                                            onChange={(e) => setEditedReplyText(e.target.value)}
                                        />
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                className="px-4 py-1 bg-primary text-white rounded-md text-sm"
                                                onClick={() => handleEditReply(reply._id, editedReplyText)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="px-4 py-1 bg-gray-200 text-gray-600 rounded-md text-sm"
                                                onClick={() => setEditingReplyId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p name="replyText" className="replyText text-sm text-gray-700">{reply.replyText}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(reply.date).toLocaleString()}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Three Dot Menu (Dropdown/Popup) */}

                        {
                            isLoggedIn &&  isOwnReply(reply.ownerId) && (
                                <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button className="text-gray-600 hover:text-gray-900">
                                        <MoreVertical className="w-2.5 h-2.5" />
                                    </button>
                                </DropdownMenuTrigger>
    
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    <DropdownMenuItem
                                        className="text-sm text-gray-600 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setEditingReplyId(reply._id);
                                            setEditedReplyText(reply.replyText);
                                        }}
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-sm text-red-600 cursor-pointer hover:bg-gray-100"
                                        onClick={() => setDeleteConfirmId(reply._id)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                        }

                    </div>
                ))}
            </div>

            {/* Delete Confirmation Dialog */}
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to delete this reply? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                                onClick={() => setDeleteConfirmId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                onClick={() => handleDeleteReply(deleteConfirmId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReplySection;
