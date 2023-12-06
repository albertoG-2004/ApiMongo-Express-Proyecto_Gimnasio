import Message from '../models/message.js';

var controller = {
    //Función para guardar un mensaje
    save: (req, res) => {
        var params = req.body;
        var message = new Message({
           message: params.message,
           from: params.from
        });
        console.log(message);
        
        message.save()
           .then(messageStored => {
              if (!messageStored) {
                 return res.status(404).json({
                    status: 'error',
                    message: 'No ha sido posible guardar el mensaje'
                 });
              }
              return res.status(200).json({
                 status: 'success',
                 messageStored
              });
           })
           .catch(error => {
              console.log(error);
              return res.status(500).json({
                 status: 'error',
                 message: 'No ha sido posible guardar el mensaje'
              });
           });
     },

    //Función para obtener los mensajes
    getMessages: async(req, res) => {
        var query = Message.find()

        query.sort('-_id').exec()
        .then(messages => {
        if (!messages || messages.length === 0) {
         return res.status(404).json({
            status: "error",
            message: "No hay mensajes para mostrar"
         });
      }

      return res.status(200).json({
         status: "success",
         messages
      });
   })
   .catch(error => {
      console.log(error);
      return res.status(500).json({
         status: "error",
         message: "Error al extraer los datos"
      });
   });
    }
}

export default controller