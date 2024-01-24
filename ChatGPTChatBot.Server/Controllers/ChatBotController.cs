using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;
namespace ChatGPTChatBot.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatBotController : ControllerBase
    {
        private string apikey { get; set; }

        public ChatBotController(IConfiguration configuration)
        {
            this.apikey = configuration.GetValue<string>("apikey");
        }

        [HttpPost]
        public async Task<IActionResult> ChatBot([FromBody] string userInput)
        {

            //var apikey = Configuration["apikey"];
            //var openai = new OpenAIAPI("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");
            var openai = new OpenAIAPI(apikey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = userInput;
            completion.Model = OpenAI_API.Models.Model.ChatGPTTurboInstruct;
            completion.MaxTokens = 500;
            try
            {
                var result = openai.Completions.CreateCompletionAsync(completion);
                string answer = string.Empty;
                if (result != null)
                {
                    foreach (var item in result.Result.Completions)
                    {
                        answer = item.Text;
                    }
                    return Ok(new { answer });
                }
                else
                {
                    return BadRequest(new { error = "Not found" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "An error occurred while processing the request.- " + ex.Message });
            }
        }

    }

}
