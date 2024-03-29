import React, { useEffect, useState } from "react";

import { Button, Form, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
// hooks
import { useProfile, useRedux } from "../../../hooks/index";
// actions
// interfaces
import {
  acceptMessage, acceptUnreadMessage,
  addContacts,
  addConversation,
  changeSelectedChat,
  createChannel,
  CreateChannelPostData,
  getArchiveContact,
  getChannelDetails,
  getChannels,
  getChatUserConversations,
  getChatUserDetails,
  getDirectMessages,
  getFavourites,
  inviteContact,
  readConversation,
  resetContacts
} from "../../../redux/actions";
// components
import AppSimpleBar from "../../../components/AppSimpleBar";
import AddGroupModal from "../../../components/AddGroupModal";
import InviteContactModal from "../../../components/InviteContactModal";
import AddButton from "../../../components/AddButton";
import ContactModal from "../../../components/ContactModal";
import Archive from "./Archive";
import DirectMessages from "./DirectMessages";
import { CHATS_TABS } from "../../../constants";
import Logo from "../../../assets/images/logo_transparent_white.png";
import socketIOClient from "socket.io-client";
import { MessagesTypes } from "../../../data";

interface IndexProps {}

const socket = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}`, {
  transports: ["websocket"]
});


const Index = (props: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  const { userProfile } = useProfile();

  const {
    isContactInvited,
    favourites,
    isContactsAdded,
    isChannelCreated,
    selectedChat,
    isFavouriteContactToggled,
    archiveContacts,
    isContactArchiveToggled,
    chatUserDetails,
    directMessages,
    chatUserConversations,
  } = useAppSelector(state => ({
    isContactInvited: state.Contacts.isContactInvited,
    favourites: state.Chats.favourites,
    directMessages: state.Chats.directMessages,
    channels: state.Chats.channels,
    isContactsAdded: state.Chats.isContactsAdded,
    isChannelCreated: state.Chats.isChannelCreated,
    selectedChat: state.Chats.selectedChat,
    isFavouriteContactToggled: state.Chats.isFavouriteContactToggled,
    archiveContacts: state.Chats.archiveContacts,
    isContactArchiveToggled: state.Chats.isContactArchiveToggled,
    chatUserDetails: state.Chats.chatUserDetails,
    chatUserConversations: state.Chats.chatUserConversations,
  }));

  /*
  get data
  */
  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getDirectMessages());
    dispatch(getChannels());
  }, [dispatch]);
  useEffect(() => {
    if (isFavouriteContactToggled) {
      dispatch(getFavourites());
      dispatch(getDirectMessages());
    }
  }, [dispatch, isFavouriteContactToggled]);


  useEffect(() => {
    console.log('socket on');
    socket.on(`${userProfile.id}`, (message: MessagesTypes) => {
      if (message.sender === chatUserDetails.id) {
        dispatch(acceptMessage(message));
        dispatch(readConversation(chatUserDetails.id));
      } else {
        for (let i = 0; i < directMessages.length; i ++) {
          if (directMessages[i].id === message.sender) {
            if (directMessages[i].unRead === undefined) {
              directMessages[i].unRead = 1;
            } else {
              directMessages[i].unRead = directMessages[i].unRead + 1;
            }
          }
        }
        dispatch(acceptUnreadMessage(directMessages));
      }
    });

    // returned function will be called on component unmount
    return () => {
      console.log('socket off');
      socket.off();
    }
  }, [directMessages, chatUserConversations]);


  /*
  invite contact modal handeling
  */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  /*
  onInvite handeling
  */
  const onInviteContact = (data: any) => {
    dispatch(inviteContact(data));
  };
  useEffect(() => {
    if (isContactInvited) {
      setIsOpen(false);
      setTimeout(() => {
        dispatch(resetContacts("isContactInvited", false));
      }, 1000);
    }
  }, [dispatch, isContactInvited]);

  /*
  contact add handeling
  */
  const [isOpenAddContact, setIsOpenAddContact] = useState<boolean>(false);
  const openAddContactModal = () => {
    setIsOpenAddContact(true);
  };
  const closeAddContactModal = () => {
    setIsOpenAddContact(false);
  };
  const onAddContact = (contacts: Array<string | number>) => {
    // dispatch(addContacts(contacts));
    dispatch(addConversation({ userId: contacts[0]}));
    setIsOpenAddContact(false);
  };
  useEffect(() => {
    if (isContactsAdded) {
      setIsOpenAddContact(false);
      dispatch(getDirectMessages());
    }
  }, [dispatch, isContactsAdded]);

  /*
  channel creation handeling
  */
  const [isOpenCreateChannel, setIsOpenCreateChannel] =
    useState<boolean>(false);
  const openCreateChannelModal = () => {
    setIsOpenCreateChannel(true);
  };
  const closeCreateChannelModal = () => {
    setIsOpenCreateChannel(false);
  };
  const onCreateChannel = (channelData: CreateChannelPostData) => {
    dispatch(createChannel(channelData));
  };
  useEffect(() => {
    if (isChannelCreated) {
      setIsOpenCreateChannel(false);
      dispatch(getChannels());
    }
  }, [dispatch, isChannelCreated]);

  /*
  select chat handling :
    get conversations
    get chat user details
  */

  const onSelectChat = (id: string | number, isChannel?: boolean) => {
    if (isChannel) {
      dispatch(getChannelDetails(id));
    } else {
      dispatch(getChatUserDetails(id));
    }
    dispatch(readConversation(id));
    dispatch(getChatUserConversations(id));
    dispatch(changeSelectedChat(id));
  };

  /*
  tab handeling
  */
  const [active, setActive] = useState(CHATS_TABS.DEFAULT);
  const onChangeTab = (tab: CHATS_TABS) => {
    setActive(tab);
  };

  /*
  archive contacts
  */
  useEffect(() => {
    dispatch(getArchiveContact());
  }, [dispatch]);
  useEffect(() => {
    if (isContactArchiveToggled) {
      dispatch(getArchiveContact());
      dispatch(getFavourites());
      dispatch(getDirectMessages());
      dispatch(getChannels());
      dispatch(getChatUserDetails(chatUserDetails.id));
    }
  }, [dispatch, isContactArchiveToggled, chatUserDetails.id]);

  return (
    <>
      <div>
        <div className="px-4 pt-4">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              {/*<h4 className="mb-4">Chats</h4>*/}
              <img src={Logo} style={{ height: 34 }} alt=""/>

            </div>
            <div className="flex-shrink-0">
              <div id="add-contact">
                {/* Button trigger modal */}
                <AddButton onClick={openModal} />
              </div>
              <UncontrolledTooltip target="add-contact" placement="bottom">
                Add Contact
              </UncontrolledTooltip>
            </div>
          </div>
          <Form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control bg-light border-0 pe-0"
                placeholder="Search here.."
                aria-label="Example text with button addon"
                aria-describedby="searchbtn-addon"
              />
              <Button
                className="btn btn-light"
                type="button"
                id="searchbtn-addon"
              >
                <i className="bx bx-search align-middle"></i>
              </Button>
            </div>
          </Form>
        </div>{" "}
        {/* .p-4 */}
        <AppSimpleBar className="chat-room-list">
          {/* Start chat-message-list */}
          {active === CHATS_TABS.DEFAULT && (
            <>
              {/* favourite */}
              {/*<Favourites
                users={favourites}
                selectedChat={selectedChat}
                onSelectChat={onSelectChat}
              />*/}

              {/* direct messages */}
              <DirectMessages
                users={directMessages}
                openAddContact={openAddContactModal}
                selectedChat={selectedChat}
                onSelectChat={onSelectChat}
              />

              {/* channels list */}
              {/*<Chanels
                channels={channels}
                openCreateChannel={openCreateChannelModal}
                selectedChat={selectedChat}
                onSelectChat={onSelectChat}
              />*/}
              {/*<h5 className="text-center mb-2">
                <Link
                  to="#"
                  className="mb-3 px-4 mt-4 font-size-11 text-primary"
                  onClick={() => onChangeTab(CHATS_TABS.ARCHIVE)}
                >
                  Archived Contacts{" "}
                  <i className="bx bxs-archive-in align-middle" />
                </Link>
              </h5>*/}
            </>
          )}
          {active === CHATS_TABS.ARCHIVE && (
            <>
              <Archive
                archiveContacts={archiveContacts}
                selectedChat={selectedChat}
                onSelectChat={onSelectChat}
              />
              <h5 className="text-center mb-2">
                <Link
                  to="#"
                  className="mb-3 px-4 mt-4 font-size-11 text-primary"
                  onClick={() => onChangeTab(CHATS_TABS.DEFAULT)}
                >
                  Chats <i className="bx bxs-archive-out align-middle" />
                </Link>
              </h5>
            </>
          )}

          {/* End chat-message-list */}
        </AppSimpleBar>
      </div>
      {/* add group Modal */}
      {isOpenCreateChannel && (
        <AddGroupModal
          isOpen={isOpenCreateChannel}
          onClose={closeCreateChannelModal}
          onCreateChannel={onCreateChannel}
        />
      )}

      {/* add contact modal */}
      {isOpen && (
        <InviteContactModal
          isOpen={isOpen}
          onClose={closeModal}
          onInvite={onInviteContact}
        />
      )}

      {isOpenAddContact && (
        <ContactModal
          isOpen={isOpenAddContact}
          onClose={closeAddContactModal}
          onAddContact={onAddContact}
        />
      )}
    </>
  );
};

export default Index;
