const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose')
const cors = require('cors');
const connectDb = require('./db/config');
const { GridFsStorage } = require("multer-gridfs-storage");


const app=express();
app.use(cors());
app.use(express.json());



const  upload  = require("./utils/upload");

app.post('/',upload.single('uploaded-file'),async (req,res)=>{
    // console.log(req.file) // details of the upload file 
  try {
    //  console.log("res",req.file);
    res.status(201).json({ text: "File uploaded successfully !",file:req.file });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
})


app.get("/file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    // console.log('file',file)
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);  //This header is used in HTTP responses to suggest a filename for the browser to use when saving the file.
    // res.set("Content-Disposition", 'attachment; filename="file donwloaded from mediaMingle.mp4"'); // now every 
    // res.json({"upload_id":file._id})
    // create a stream to read from the bucket
    // console.log("res",res);
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: { text: `Unable to download file`, error }});
  }
});




    // creating instance of the bucket
    let bucket;
    (()=>{
      mongoose.connection.on("connected", () => {
        bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "newBucket",
        }
        );
        console.log('bucket ready to use');
      });
    })() 

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    connectDb();
    
})


// id: new ObjectId("660305b7c81389cf6eb93c74"),

/*
    ezsnippet video 
    upload details
    {
      fieldname: 'uploaded-file',
      originalname: 'ezsnippet_323727484_24547861914828918_5316742156989197760_n.mp4',
      encoding: '7bit',
      mimetype: 'video/mp4',
      id: new ObjectId("66030754ca5026d5310aae49"),
      filename: 'ezsnippet_323727484_24547861914828918_5316742156989197760_n.mp4',
      metadata: null,
      bucketName: 'newBucket',
      chunkSize: 261120,
      size: 8361549,    = 8165.57.. Kb = 7.974Mb
      md5: undefined,
      uploadDate: 2024-03-26T17:35:18.394Z,
      contentType: 'video/mp4'
    }

*/



//     final response 

//     <ref *2> ServerResponse {
//   _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
//   _eventsCount: 1,
//   _maxListeners: undefined,
//   outputData: [],
//   outputSize: 0,
//   writable: true,
//   destroyed: false,
//   _last: false,
//   chunkedEncoding: false,
//   shouldKeepAlive: true,
//   maxRequestsOnConnectionReached: false,
//   _defaultKeepAlive: true,
//   useChunkedEncodingByDefault: true,
//   sendDate: true,
//   _removedConnection: false,
//   _removedContLen: false,
//   _removedTE: false,
//   strictContentLength: false,
//   _contentLength: null,
//   _hasBody: true,
//   _trailer: '',
//   finished: false,
//   _headerSent: false,
//   _closed: false,
//   socket: <ref *1> Socket {
//     connecting: false,
//     _hadError: false,
//     _parent: null,
//     _host: null,
//     _closeAfterHandlingError: false,
//     _readableState: ReadableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       buffer: BufferList { head: null, tail: null, length: 0 },
//       length: 0,
//       pipes: [],
//       flowing: true,
//       ended: false,
//       endEmitted: false,
//       reading: true,
//       constructed: true,
//       sync: false,
//       needReadable: true,
//       emittedReadable: false,
//       readableListening: false,
//       resumeScheduled: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: true,
//       destroyed: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false,
//       defaultEncoding: 'utf8',
//       awaitDrainWriters: null,
//       multiAwaitDrain: false,
//       readingMore: false,
//       dataEmitted: false,
//       decoder: null,
//       encoding: null,
//       [Symbol(kPaused)]: false
//     },
//     _events: [Object: null prototype] {
//       end: [Array],
//       timeout: [Function: socketOnTimeout],
//       data: [Function: bound socketOnData],
//       error: [Function: socketOnError],
//       close: [Array],
//       drain: [Function: bound socketOnDrain],
//       resume: [Function: onSocketResume],
//       pause: [Function: onSocketPause]
//     },
//     _eventsCount: 8,
//     _maxListeners: undefined,
//     _writableState: WritableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       finalCalled: false,
//       needDrain: false,
//       ending: false,
//       ended: false,
//       finished: false,
//       destroyed: false,
//       decodeStrings: false,
//       defaultEncoding: 'utf8',
//       length: 0,
//       writing: false,
//       corked: 0,
//       sync: true,
//       bufferProcessing: false,
//       onwrite: [Function: bound onwrite],
//       writecb: null,
//       writelen: 0,
//       afterWriteTickInfo: null,
//       buffered: [],
//       bufferedIndex: 0,
//       allBuffers: true,
//       allNoop: true,
//       pendingcb: 0,
//       constructed: true,
//       prefinished: false,
//       errorEmitted: false,
//       emitClose: false,
//       autoDestroy: true,
//       errored: null,
//       closed: false,
//       closeEmitted: false,
//       [Symbol(kOnFinished)]: []
//     },
//     allowHalfOpen: true,
//     _sockname: null,
//     _pendingData: null,
//     _pendingEncoding: '',
//     server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       requestTimeout: 300000,
//       headersTimeout: 60000,
//       keepAliveTimeout: 5000,
//       connectionsCheckingInterval: 30000,
//       joinDuplicateHeaders: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       noDelay: true,
//       keepAlive: false,
//       keepAliveInitialDelay: 0,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       maxHeadersCount: null,
//       maxRequestsPerSocket: 0,
//       _connectionKey: '6::::5000',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 15,
//       [Symbol(http.server.connections)]: ConnectionsList {},
//       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
//         _idleTimeout: 30000,
//         _idlePrev: [TimersList],
//         _idleNext: [TimersList],
//         _idleStart: 1064,
//         _onTimeout: [Function: bound checkConnections],
//         _timerArgs: undefined,
//         _repeat: 30000,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(kHasPrimitive)]: false,
//         [Symbol(asyncId)]: 14,
//         [Symbol(triggerId)]: 1
//       },
//       [Symbol(kUniqueHeaders)]: null
//     },
//     _server: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       requestTimeout: 300000,
//       headersTimeout: 60000,
//       keepAliveTimeout: 5000,
//       connectionsCheckingInterval: 30000,
//       joinDuplicateHeaders: undefined,
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       _connections: 2,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       noDelay: true,
//       keepAlive: false,
//       keepAliveInitialDelay: 0,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       maxHeadersCount: null,
//       maxRequestsPerSocket: 0,
//       _connectionKey: '6::::5000',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 15,
//       [Symbol(http.server.connections)]: ConnectionsList {},
//       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
//         _idleTimeout: 30000,
//         _idlePrev: [TimersList],
//         _idleNext: [TimersList],
//         _idleStart: 1064,
//         _onTimeout: [Function: bound checkConnections],
//         _timerArgs: undefined,
//         _repeat: 30000,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(kHasPrimitive)]: false,
//         [Symbol(asyncId)]: 14,
//         [Symbol(triggerId)]: 1
//       },
//       [Symbol(kUniqueHeaders)]: null
//     },
//     parser: HTTPParser {
//       '0': null,
//       '1': [Function: parserOnHeaders],
//       '2': [Function: parserOnHeadersComplete],
//       '3': [Function: parserOnBody],
//       '4': [Function: parserOnMessageComplete],
//       '5': [Function: bound onParserExecute],
//       '6': [Function: bound onParserTimeout],
//       _headers: [],
//       _url: '',
//       socket: [Circular *1],
//       incoming: [IncomingMessage],
//       outgoing: null,
//       maxHeaderPairs: 2000,
//       _consumed: true,
//       onIncoming: [Function: bound parserOnIncoming],
//       [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
//     },
//     on: [Function: socketListenerWrap],
//     addListener: [Function: socketListenerWrap],
//     prependListener: [Function: socketListenerWrap],
//     setEncoding: [Function: socketSetEncoding],
//     _paused: false,
//     _httpMessage: [Circular *2],
//     [Symbol(async_id_symbol)]: 326,
//     [Symbol(kHandle)]: TCP {
//       reading: true,
//       onconnection: null,
//       _consumed: true,
//       [Symbol(owner_symbol)]: [Circular *1]
//     },
//     [Symbol(lastWriteQueueSize)]: 0,
//     [Symbol(timeout)]: null,
//     [Symbol(kBuffer)]: null,
//     [Symbol(kBufferCb)]: null,
//     [Symbol(kBufferGen)]: null,
//     [Symbol(kCapture)]: false,
//     [Symbol(kSetNoDelay)]: true,
//     [Symbol(kSetKeepAlive)]: false,
//     [Symbol(kSetKeepAliveInitialDelay)]: 0,
//     [Symbol(kBytesRead)]: 0,
//     [Symbol(kBytesWritten)]: 0
//   },
//   _header: null,
//   _keepAliveTimeout: 5000,
//   _onPendingData: [Function: bound updateOutgoingData],
//   req: IncomingMessage {
//     _readableState: ReadableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       buffer: BufferList { head: null, tail: null, length: 0 },
//       length: 0,
//       pipes: [],
//       flowing: null,
//       ended: true,
//       endEmitted: false,
//       reading: false,
//       constructed: true,
//       sync: true,
//       needReadable: false,
//       emittedReadable: false,
//       readableListening: false,
//       resumeScheduled: false,
//       errorEmitted: false,
//       emitClose: true,
//       autoDestroy: true,
//       destroyed: false,
//       errored: null,
//       closed: false,
//       closeEmitted: false,
//       defaultEncoding: 'utf8',
//       awaitDrainWriters: null,
//       multiAwaitDrain: false,
//       readingMore: true,
//       dataEmitted: false,
//       decoder: null,
//       encoding: null,
//       [Symbol(kPaused)]: null
//     },
//     _events: [Object: null prototype] {},
//     _eventsCount: 0,
//     _maxListeners: undefined,
//     socket: <ref *1> Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       setEncoding: [Function: socketSetEncoding],
//       _paused: false,
//       _httpMessage: [Circular *2],
//       [Symbol(async_id_symbol)]: 326,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: true,
//       [Symbol(kSetKeepAlive)]: false,
//       [Symbol(kSetKeepAliveInitialDelay)]: 0,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     httpVersionMajor: 1,
//     httpVersionMinor: 1,
//     httpVersion: '1.1',
//     complete: true,
//     rawHeaders: [
//       'Host',
//       'localhost:5000',
//       'Connection',
//       'keep-alive',
//       'sec-ch-ua',
//       '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
//       'sec-ch-ua-mobile',
//       '?0',
//       'sec-ch-ua-platform',
//       '"Windows"',
//       'Upgrade-Insecure-Requests',
//       '1',
//       'User-Agent',
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
//       'Accept',
//       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//       'Sec-Fetch-Site',
//       'none',
//       'Sec-Fetch-Mode',
//       'navigate',
//       'Sec-Fetch-User',
//       '?1',
//       'Sec-Fetch-Dest',
//       'document',
//       'Accept-Encoding',
//       'gzip, deflate, br',
//       'Accept-Language',
//       'en-US,en;q=0.9,en-IN;q=0.8'
//     ],
//     rawTrailers: [],
//     joinDuplicateHeaders: undefined,
//     aborted: false,
//     upgrade: false,
//     url: '/file/66030ca3551b7fdf1e193385',
//     method: 'GET',
//     statusCode: null,
//     statusMessage: null,
//     client: <ref *1> Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       setEncoding: [Function: socketSetEncoding],
//       _paused: false,
//       _httpMessage: [Circular *2],
//       [Symbol(async_id_symbol)]: 326,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: true,
//       [Symbol(kSetKeepAlive)]: false,
//       [Symbol(kSetKeepAliveInitialDelay)]: 0,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     _consuming: false,
//     _dumped: false,
//     next: [Function: next],
//     baseUrl: '',
//     originalUrl: '/file/66030ca3551b7fdf1e193385',
//     _parsedUrl: Url {
//       protocol: null,
//       slashes: null,
//       auth: null,
//       host: null,
//       port: null,
//       hostname: null,
//       hash: null,
//       search: null,
//       query: null,
//       pathname: '/file/66030ca3551b7fdf1e193385',
//       path: '/file/66030ca3551b7fdf1e193385',
//       href: '/file/66030ca3551b7fdf1e193385',
//       _raw: '/file/66030ca3551b7fdf1e193385'
//     },
//     params: { fileId: '66030ca3551b7fdf1e193385' },
//     query: {},
//     res: [Circular *2],
//     body: {},
//     route: Route { path: '/file/:fileId', stack: [Array], methods: [Object] },
//     [Symbol(kCapture)]: false,
//     [Symbol(kHeaders)]: {
//       host: 'localhost:5000',
//       connection: 'keep-alive',
//       'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
//       'sec-ch-ua-mobile': '?0',
//       'sec-ch-ua-platform': '"Windows"',
//       'upgrade-insecure-requests': '1',
//       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
//       accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//       'sec-fetch-site': 'none',
//       'sec-fetch-mode': 'navigate',
//       'sec-fetch-user': '?1',
//       'sec-fetch-dest': 'document',
//       'accept-encoding': 'gzip, deflate, br',
//       'accept-language': 'en-US,en;q=0.9,en-IN;q=0.8'
//     },
//     [Symbol(kHeadersCount)]: 28,
//     [Symbol(kTrailers)]: null,
//     [Symbol(kTrailersCount)]: 0
//   },
//   _sent100: false,
//   _expect_continue: false,
//   _maxRequestsPerSocket: 0,
//   locals: [Object: null prototype] {},
//   [Symbol(kCapture)]: false,
//   [Symbol(kBytesWritten)]: 0,
//   [Symbol(kNeedDrain)]: false,
//   [Symbol(corked)]: 0,
//   [Symbol(kOutHeaders)]: [Object: null prototype] {
//     'x-powered-by': [ 'X-Powered-By', 'Express' ],
//     'access-control-allow-origin': [ 'Access-Control-Allow-Origin', '*' ],
//     'content-type': [ 'Content-Type', 'video/mp4' ],
//     'content-disposition': [
//       'Content-Disposition',
//       'attachment; filename=ezsnippet_323727484_24547861914828918_5316742156989197760_n.mp4'
//     ]
//   },
//   [Symbol(errored)]: null,
//   [Symbol(kUniqueHeaders)]: null
// }


