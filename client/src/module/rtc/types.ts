import { ChannelType, ConnectionType, Member } from "../members/types"

type Socket = any;
export interface StartConnetionProps {
  localMember: Member
  remoteMember: Member
  streams: MediaStream[] | undefined
  connectionPurpose: ConnectionType
  data: any | null
  dataChannelName: ChannelType
}

// Fixed: Removed generic type parameters
export type SocketSend = (
  event: any,
  data: any
) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>

export type SocketListen = (
  event: any,
  callback: any
) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>

export type SocketRemoveListener = (
  event: any
) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>

export type SocketDisconnect = () => void

export interface RtcType {
  startConnection: (props: StartConnetionProps) => Promise<RTCPeerConnection>
  testConsole: () => void
}

export interface RTCClientType {
  socket: SocketReturnType
  rtcClient: RtcType
}

export type SocketReturnType = {
  send: (event: any, data: any) => void
  listen: (event: any, data: any) => void
}

export type RTCClientHooksType = {
  makePeerConnection: (props: StartConnetionProps) => Promise<{
    peerConnection: RTCPeerConnection
    datachannel: RTCDataChannel
  }>
  makeOffer: (
    peerConnection: RTCPeerConnection,
    localMember: Member,
    remoteMember: Member,
    connectionPurpose: string
  ) => Promise<void>
  handleOffer: (
    peerConnection: RTCPeerConnection,
    data: {
      offer: RTCSessionDescriptionInit
      from: any
      name: string
      connectionPurpose: string
    },
    connectionPurpose: string
  ) => Promise<void>
}

// Fixed: Removed generic type parameters
export type SocketHooksType = {
  send: (event: any, data: any) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>
  listen: (
    event: any,
    callback: any
  ) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>
  removeListener: (event: any) => Socket  // Removed <DefaultEventsMap, DefaultEventsMap>
  disconnect: () => void
}

export type SocketHandlerType = {
  handleMeetingCreated: (data: any) => void
  handleConnectedToSocket: (data: any) => void
  handleOnNewUserJoined: (data: any) => Promise<void>
  handleIncomingOffer: (data: any) => Promise<void>
}

export type RtcPropsType = RTCClientHooksType &
  SocketHooksType &
  SocketHandlerType