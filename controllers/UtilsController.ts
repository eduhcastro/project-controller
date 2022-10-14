const UtilsController = {

  GetDate: () => {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  },

  GetFullDate: () => {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  },

  GenerateLogName: (folder: string) => {
    return folder + '/project-controller-' + UtilsController.GetDate();
  },

}

export default UtilsController;