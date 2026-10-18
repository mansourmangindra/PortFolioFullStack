using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;

namespace Portfolio.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<ProjectDto>> GetAllProjects(CancellationToken cancellationToken)
        {
            var project = await _projectService.GetAllProjectsAsync(cancellationToken);
            if (project == null) return NotFound(new { message = $"There's no Project" });
            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetById(string id, CancellationToken cancellationToken)
        {
            var project = await _projectService.GetProjectByIdAsync(id, cancellationToken);
            if (project == null) return NotFound(new { message = $"Project with ID {id} was not found." });
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> Create([FromBody] UpsertProjectDto dto, CancellationToken cancellationToken)
        {
            var createdProject = await _projectService.CreateProjectAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = createdProject.Id }, createdProject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpsertProjectDto dto, CancellationToken cancellationToken)
        {
            await _projectService.UpdateProjectAsync(id, dto, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
        {
            await _projectService.DeleteProjectAsync(id, cancellationToken);
            return NoContent();
        }
    }
}
